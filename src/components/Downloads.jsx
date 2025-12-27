import { useState, useEffect } from 'react'

const REPO_OWNER = 'xtul9'
const REPO_NAME = 'rimworld-workshop-downloader'
const API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases/latest`

// Map file extensions to platform info
// Order: 1=Windows, 2=Linux(rpm), 3=Linux(deb), 4=macOS
const getPlatformInfo = (filename) => {
  const lowerName = filename.toLowerCase()
  
  if (lowerName.endsWith('.msi')) {
    return { platform: 'Windows (msi)', icon: '🪟', type: 'msi', order: 1 }
  }
  if (lowerName.endsWith('.rpm')) {
    return { platform: 'Linux (rpm)', icon: '🐧', type: 'rpm', order: 2 }
  }
  if (lowerName.endsWith('.deb')) {
    return { platform: 'Linux (deb)', icon: '🐧', type: 'deb', order: 3 }
  }
  if (lowerName.endsWith('.dmg')) {
    return { platform: 'macOS (dmg)', icon: '🍎', type: 'dmg', order: 4 }
  }
  
  return null
}

function Downloads() {
  const [downloads, setDownloads] = useState([])
  const [version, setVersion] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(API_URL)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch releases: ${response.statusText}`)
        }
        
        const data = await response.json()
        
        // Store version (tag_name usually contains version like "v1.0.0" or just version number)
        setVersion(data.tag_name || data.name || null)
        
        // Group assets by platform type
        const groupedDownloads = {}
        
        data.assets.forEach(asset => {
          const platformInfo = getPlatformInfo(asset.name)
          
          if (platformInfo) {
            if (!groupedDownloads[platformInfo.type]) {
              groupedDownloads[platformInfo.type] = {
                platform: platformInfo.platform,
                icon: platformInfo.icon,
                order: platformInfo.order,
                links: []
              }
            }
            
            groupedDownloads[platformInfo.type].links.push({
              label: asset.name,
              url: asset.browser_download_url,
              size: asset.size
            })
          }
        })
        
        // Convert to array and sort by order: Windows, Linux(rpm), Linux(deb), macOS
        const downloadsArray = Object.values(groupedDownloads).sort((a, b) => a.order - b.order)
        setDownloads(downloadsArray)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching releases:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchReleases()
  }, [])

  const formatFileSize = (bytes) => {
    if (!bytes) return ''
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(1)} MB`
  }

  return (
    <section className="downloads">
      <div className="container">
        <h2 className="section-title">
          Downloads
          {version && <span className="version-badge">{version}</span>}
        </h2>
        
        {loading && (
          <div className="downloads-loading">
            <p>Loading available downloads...</p>
          </div>
        )}
        
        {error && (
          <div className="downloads-error">
            <p>Error loading downloads: {error}</p>
            <p>Please try again later or visit the <a href={`https://github.com/${REPO_OWNER}/${REPO_NAME}/releases`} target="_blank" rel="noopener noreferrer">GitHub Releases page</a> directly.</p>
          </div>
        )}
        
        {!loading && !error && downloads.length === 0 && (
          <div className="downloads-empty">
            <p>No downloads available at the moment.</p>
          </div>
        )}
        
        {!loading && !error && downloads.length > 0 && (
          <div className="downloads-grid">
            {downloads.map((download, index) => (
              <div key={index} className="download-card">
                <div className="download-icon">{download.icon}</div>
                <h3 className="download-platform">{download.platform}</h3>
                <div className="download-links">
                  {download.links.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.url}
                      className="download-button"
                      target="_blank"
                      rel="noopener noreferrer"
                      title={link.label}
                    >
                      Download
                      {link.size && (
                        <span className="download-size"> ({formatFileSize(link.size)})</span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="source-code">
          <a
            href={`https://github.com/${REPO_OWNER}/${REPO_NAME}`}
            className="source-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Source Code on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

export default Downloads

