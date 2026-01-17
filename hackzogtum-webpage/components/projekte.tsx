import Image from 'next/image'
import Link from 'next/link'

const projects = [
  {
    title: "3D-Drucker",
    image: "/images/3d-drucker-300x190.jpg",
    link: "/posts/3d-drucker-bausatz"
  },
  {
    title: "Löten",
    image: "/images/loetstationen-300x225.jpg"
  },
  {
    title: "Platinen-Entwicklung",
    image: "/images/loetstationen-300x225.jpg"
  },
  {
    title: "Amateurfunk",
    image: "/images/afu.jpg",
    link: "/posts/afu-kurs"
  },
  {
    title: "Door-Pi",
    image: "/images/board-1429589_1920.jpg"
  },
  {
    title: "Canphone",
    image: "/images/dosentelefonHackzogtum_08.jpg",
    link: "/posts/1432"
  },
  {
    title: "Workshops und Vorträge",
    image: "/images/make_hackzogtum-300x217.png"
  }
];

export default function Projekte() {
    return (
      <section className="mb-32">
        <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: 'var(--color-primary)' }}>
          Unsere Projekte
        </h2>
        <div className="posts-grid posts-grid-all gap-6 md:gap-8 lg:gap-10 xl:gap-12">
          {projects.map((project) => (
            <div key={project.title} className="post-item">
              <div className="postPreviewContainer">
                <div className="mb-5 relative" style={{ aspectRatio: '1/1', overflow: 'hidden', borderRadius: '0.5rem' }}>
                  <Image 
                    src={project.image}
                    alt={project.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h3 className="text-2xl mb-3 leading-snug font-bold" style={{ color: 'var(--color-primary)' }}>
                  {project.link ? (
                    <Link href={project.link} className="no-underline hover:opacity-80">
                      {project.title}
                    </Link>
                  ) : (
                    project.title
                  )}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
}
