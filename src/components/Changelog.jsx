import { useState, useEffect } from 'react'

const CHANGELOG_URL = 'https://raw.githubusercontent.com/xtul9/rimworld-workshop-downloader/refs/heads/master/CHANGELOG.md'

// Parse changelog into version sections
const parseChangelog = (text) => {
  if (!text) return []
  
  const lines = text.split('\n')
  const versions = []
  let currentVersion = null
  let currentContent = []
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Check if this is a version header (## vX.X.X or ## Version X.X.X)
    if (line.match(/^##\s+(v?\d+\.\d+\.\d+)/)) {
      // Save previous version if exists
      if (currentVersion) {
        versions.push({
          version: currentVersion,
          content: currentContent.join('\n')
        })
      }
      
      // Start new version
      currentVersion = line.replace(/^##\s+/, '').trim()
      currentContent = []
    } else if (currentVersion) {
      // Add line to current version content
      currentContent.push(line)
    }
  }
  
  // Add last version
  if (currentVersion) {
    versions.push({
      version: currentVersion,
      content: currentContent.join('\n')
    })
  }
  
  return versions
}

// Simple markdown parser for changelog content
const parseMarkdown = (text) => {
  if (!text) return ''
  
  const lines = text.split('\n')
  let html = ''
  let inList = false
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    // Headers (skip h2 as it's the version header)
    if (line.startsWith('### ')) {
      if (inList) {
        html += '</ul>'
        inList = false
      }
      html += `<h4>${line.substring(4)}</h4>`
      continue
    }
    if (line.startsWith('## ')) {
      if (inList) {
        html += '</ul>'
        inList = false
      }
      html += `<h3>${line.substring(3)}</h3>`
      continue
    }
    
    // List items
    if (line.startsWith('- ')) {
      if (!inList) {
        html += '<ul>'
        inList = true
      }
      const content = line.substring(2)
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      html += `<li>${content}</li>`
      continue
    }
    
    // End list if we hit a non-list line
    if (inList && line === '') {
      html += '</ul>'
      inList = false
      continue
    }
    
    // Empty lines
    if (line === '') {
      if (inList) {
        html += '</ul>'
        inList = false
      }
      continue
    }
    
    // Regular text
    if (inList) {
      html += '</ul>'
      inList = false
    }
    const processedLine = line
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    html += `<p>${processedLine}</p>`
  }
  
  // Close any open list
  if (inList) {
    html += '</ul>'
  }
  
  return html
}

function Changelog() {
  const [versions, setVersions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchChangelog = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(CHANGELOG_URL)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch changelog: ${response.statusText}`)
        }
        
        const text = await response.text()
        const parsedVersions = parseChangelog(text)
        setVersions(parsedVersions)
        setCurrentIndex(0) // Start with latest version
      } catch (err) {
        setError(err.message)
        console.error('Error fetching changelog:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchChangelog()
  }, [])

  const currentVersion = versions[currentIndex]
  const parsedContent = currentVersion ? parseMarkdown(currentVersion.content) : ''

  const goToPrevious = () => {
    if (currentIndex < versions.length - 1) {
      setCurrentIndex(currentIndex + 1) // Go to older version (higher index)
    }
  }

  const goToNext = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1) // Go to newer version (lower index)
    }
  }

  const goToVersion = (index) => {
    setCurrentIndex(index)
  }

  return (
    <section className="changelog">
      <div className="container">
        <h2 className="section-title">Changelog</h2>
        
        {loading && (
          <div className="changelog-loading">
            <p>Loading changelog...</p>
          </div>
        )}
        
        {error && (
          <div className="changelog-error">
            <p>Error loading changelog: {error}</p>
            <p>Please visit the <a href="https://github.com/xtul9/rimworld-workshop-downloader/blob/master/CHANGELOG.md" target="_blank" rel="noopener noreferrer">GitHub repository</a> to view the changelog.</p>
          </div>
        )}
        
        {!loading && !error && versions.length > 0 && currentVersion && (
          <>
            <div className="changelog-navigation">
              <div className="changelog-version-selector">
                <label htmlFor="version-select">Version:</label>
                <select
                  id="version-select"
                  value={currentIndex}
                  onChange={(e) => goToVersion(Number(e.target.value))}
                  className="version-select"
                >
                  {versions.map((v, index) => (
                    <option key={index} value={index}>
                      {v.version}
                    </option>
                  ))}
                </select>
              </div>
              <div className="changelog-pagination">
                <button
                  onClick={goToPrevious}
                  disabled={currentIndex >= versions.length - 1}
                  className="pagination-button"
                  aria-label="Previous version"
                >
                  ← Previous
                </button>
                <span className="pagination-info">
                  {versions.length - currentIndex} of {versions.length}
                </span>
                <button
                  onClick={goToNext}
                  disabled={currentIndex === 0}
                  className="pagination-button"
                  aria-label="Next version"
                >
                  Next →
                </button>
              </div>
            </div>
            
            <div className="changelog-content">
              <h3 className="changelog-version-title">{currentVersion.version}</h3>
              <div 
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Changelog

