
// export default Portfolio;
import React, { useState, useEffect } from 'react';
import { Loader2, Mail, Phone, Linkedin, Github, ExternalLink, Calendar, Briefcase, Code, Brain, Award, AlertCircle, X } from 'lucide-react';

const Portfolio = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);


import React, { useState, useEffect } from 'react';
import { Loader2, Mail, Phone, Linkedin, Github, ExternalLink, Calendar, Briefcase, Code, Brain, Award, AlertCircle, X } from 'lucide-react';

const Portfolio = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  // Backend API URL - use environment variable in production, localhost in development
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const API_URL = `${API_BASE_URL}/api/portfolio/`;

  // Open project modal
  const openProjectModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  // Close project modal
  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  useEffect(() => {
    // Fetch data from Django backend
    fetch(API_URL)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [API_URL]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-400 mx-auto mb-4" />
          <p className="text-white text-lg">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
        <div className="text-center max-w-2xl">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Unable to Load Portfolio</h2>
          <p className="text-gray-300 mb-4">Error: {error}</p>
          <div className="bg-slate-800/50 rounded-lg p-6 text-left">
            <p className="text-sm text-gray-400 mb-2">Troubleshooting steps:</p>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>✓ Make sure Django backend is running at <code className="bg-purple-900/50 px-2 py-1 rounded">http://localhost:8000</code></li>
              <li>✓ Check that you've added data in Django admin panel</li>
              <li>✓ Verify CORS is configured correctly in Django settings</li>
              <li>✓ Check browser console for detailed error messages</li>
            </ul>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Check if data exists
  if (!data || !data.profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
        <div className="text-center max-w-2xl">
          <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">No Portfolio Data Found</h2>
          <p className="text-gray-300 mb-4">Please add your portfolio data in the Django admin panel.</p>
          <a 
            href="http://localhost:8000/admin" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
          >
            Go to Admin Panel
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={closeProjectModal}
        >
          <div 
            className="bg-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border-2 border-purple-500/30 shadow-2xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-slate-800 border-b border-purple-500/20 p-6 flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-purple-300 mb-2">{selectedProject.title}</h2>
                {selectedProject.tech && selectedProject.tech.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-purple-900/50 rounded-full text-xs sm:text-sm text-purple-300 border border-purple-500/30">
                        {tech.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <button 
                onClick={closeProjectModal}
                className="ml-4 p-2 hover:bg-slate-700 rounded-lg transition"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
                  {selectedProject.description}
                </p>
              </div>

              {/* Links */}
              <div className="flex gap-4 mt-6 pt-6 border-t border-purple-500/20">
                {selectedProject.github && (
                  <a 
                    href={selectedProject.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition text-sm sm:text-base"
                  >
                    <Github className="w-5 h-5" />
                    View Code
                  </a>
                )}
                {selectedProject.demo && (
                  <a 
                    href={selectedProject.demo} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition text-sm sm:text-base"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="w-full px-4 sm:px-6 lg:px-16 xl:px-32 2xl:px-48 py-12 sm:py-16 lg:py-20">
        <div className="w-full text-center">
          <div className="mb-4 sm:mb-6">
            <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-4 sm:mb-6 flex items-center justify-center">
              <Brain className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent px-4">
            {data.profile.name}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl text-purple-300 mb-4 sm:mb-6 px-4">{data.profile.title}</p>
          <p className="text-base sm:text-lg text-gray-300 max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
            {data.profile.bio}
          </p>
          <div className="flex justify-center gap-3 sm:gap-4 flex-wrap px-4">
            {data.profile.email && (
              <a href={`mailto:${data.profile.email}`} className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition text-sm sm:text-base">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Email</span>
                <span className="sm:hidden">Mail</span>
              </a>
            )}
            {data.profile.linkedin && (
              <a href={data.profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition text-sm sm:text-base">
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                LinkedIn
              </a>
            )}
            {data.profile.github && (
              <a href={data.profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition text-sm sm:text-base">
                <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                GitHub
              </a>
            )}
            {data.profile.phone && (
              <a href={`tel:${data.profile.phone}`} className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-green-600 hover:bg-green-700 rounded-lg transition text-sm sm:text-base">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Call</span>
              </a>
            )}
          </div>
          {data.profile.location && (
            <p className="text-gray-400 mt-4 text-sm">📍 {data.profile.location}</p>
          )}
        </div>
      </section>

      {/* Skills Section */}
      {data.skills && data.skills.length > 0 && (
        <section className="w-full px-4 sm:px-6 lg:px-16 xl:px-32 2xl:px-48 py-12 sm:py-16">
          <div className="w-full">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center flex items-center justify-center gap-3">
              <Code className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
              <span>Technical Skills</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {data.skills.map((skillGroup, idx) => (
                <div key={idx} className="bg-slate-800/50 backdrop-blur rounded-xl p-4 sm:p-6 border border-purple-500/20 hover:border-purple-500/40 transition">
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-purple-400">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items && skillGroup.items.map((skill, i) => (
                      <span key={i} className="px-2 sm:px-3 py-1 bg-purple-900/50 rounded-full text-xs sm:text-sm border border-purple-500/30">
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experience Section */}
      {data.experience && data.experience.length > 0 && (
        <section className="w-full px-4 sm:px-6 lg:px-16 xl:px-32 2xl:px-48 py-12 sm:py-16">
          <div className="w-full">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center flex items-center justify-center gap-3">
              <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
              <span>Experience</span>
            </h2>
            {data.experience.map((exp, idx) => (
              <div key={idx} className="bg-slate-800/50 backdrop-blur rounded-xl p-5 sm:p-8 border border-purple-500/20 mb-6">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-purple-300">{exp.title}</h3>
                    <p className="text-lg sm:text-xl text-gray-300">{exp.company}</p>
                  </div>
                  <span className="flex items-center gap-2 text-sm sm:text-base text-gray-400">
                    <Calendar className="w-4 h-4" />
                    {exp.duration}
                  </span>
                </div>
                <p className="text-sm sm:text-base text-gray-300 mb-4">{exp.description}</p>
                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm sm:text-base text-gray-300">
                        <span className="text-purple-400 mt-1">▹</span>
                        <span>{achievement.description}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {data.projects && data.projects.length > 0 && (
        <section className="w-full px-4 sm:px-6 lg:px-16 xl:px-32 2xl:px-48 py-12 sm:py-16">
          <div className="w-full">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center flex items-center justify-center gap-3">
              <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
              <span>Projects</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {data.projects.map((project, idx) => {
                const descriptionPreview = project.description?.length > 120 
                  ? project.description.substring(0, 120) + '...' 
                  : project.description;

                return (
                  <div 
                    key={idx} 
                    className="bg-slate-800/50 backdrop-blur rounded-xl p-5 sm:p-6 border border-purple-500/20 hover:border-purple-500/40 transition hover:transform hover:scale-105 cursor-pointer"
                    onClick={() => openProjectModal(project)}
                  >
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-purple-300">{project.title}</h3>
                    <p className="text-gray-300 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
                      {descriptionPreview}
                    </p>
                    {project.tech && project.tech.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                        {project.tech.slice(0, 4).map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-purple-900/30 rounded text-xs text-purple-300 border border-purple-500/30">
                            {tech.name}
                          </span>
                        ))}
                        {project.tech.length > 4 && (
                          <span className="px-2 py-1 text-xs text-purple-400">
                            +{project.tech.length - 4} more
                          </span>
                        )}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-purple-400 text-xs">
                      <span>Click to view details</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Education & Certifications */}
      {((data.education && data.education.length > 0) || (data.certifications && data.certifications.length > 0)) && (
        <section className="w-full px-4 sm:px-6 lg:px-16 xl:px-32 2xl:px-48 py-12 sm:py-16">
          <div className="w-full">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center flex items-center justify-center gap-3">
              <Award className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
              <span>Education & Certifications</span>
            </h2>
            <div className="space-y-4 sm:space-y-6">
              {data.education && data.education.map((edu, idx) => (
                <div key={idx} className="bg-slate-800/50 backdrop-blur rounded-xl p-5 sm:p-6 border border-purple-500/20">
                  <h3 className="text-lg sm:text-xl font-semibold text-purple-300">{edu.degree}</h3>
                  <p className="text-sm sm:text-base text-gray-300">{edu.institution}</p>
                  <p className="text-xs sm:text-sm text-gray-400">{edu.duration}</p>
                  {edu.details && <p className="text-gray-300 mt-2 text-xs sm:text-sm">{edu.details}</p>}
                </div>
              ))}
              {data.certifications && data.certifications.length > 0 && (
                <div className="bg-slate-800/50 backdrop-blur rounded-xl p-5 sm:p-6 border border-purple-500/20">
                  <h3 className="text-lg sm:text-xl font-semibold text-purple-300 mb-3 sm:mb-4">Certifications</h3>
                  <div className="space-y-3">
                    {data.certifications.map((cert, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                        <div>
                          <p className="text-sm sm:text-base text-gray-300">{cert.name}</p>
                          <p className="text-xs sm:text-sm text-gray-400">{cert.issuer}</p>
                        </div>
                        <span className="text-sm sm:text-base text-purple-400">{cert.year}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="w-full px-4 sm:px-6 lg:px-16 xl:px-32 2xl:px-48 py-6 sm:py-8 text-center text-sm sm:text-base text-gray-400 border-t border-purple-500/20">
        <p>© 2025 {data.profile.name}. Built with React & Django.</p>
      </footer>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;