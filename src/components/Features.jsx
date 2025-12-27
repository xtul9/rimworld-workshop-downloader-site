function Features() {
  const features = [
    {
      title: 'No Steam Required',
      description: 'Download Rimworld mods directly from Steam Workshop without needing Steam installed on your system.'
    },
    {
      title: 'Cross-Platform',
      description: 'Works on Linux, Windows, and macOS. Built with cross-platform compatibility in mind.'
    },
    {
      title: 'Easy to Use',
      description: 'Simple interface that makes downloading and managing mods straightforward.'
    },
    {
      title: 'Batch Downloads',
      description: 'Download multiple mods at once by providing a list of Workshop IDs or Workshop URLs.'
    },
    {
      title: 'Mod Management',
      description: 'Manage your mod updates with ease.'
    },
    {
      title: 'Open Source',
      description: 'Free and open source based on MIT license. Contribute, fork, and customize to your needs.'
    }
  ]

  return (
    <section className="features">
      <div className="container">
        <h2 className="section-title">Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="early-development-notice">
          <p className="early-development-text">
            <strong>⚠️ Early Development:</strong> This application is in early development phase and bugs may occur. 
            Contributions and bug reports are welcome!
          </p>
        </div>
      </div>
    </section>
  )
}

export default Features

