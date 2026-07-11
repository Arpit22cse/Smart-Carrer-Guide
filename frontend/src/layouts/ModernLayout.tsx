import React from "react";

const ModernLayout = ({ data }: any) => {
  const { profile, links, skills, experience, projects, education, certifications } = data;

  return (
    <div
      style={{
        display: "flex",
        width: "800px",
        margin: "auto",
        fontFamily: "Arial, sans-serif",
        background: "#fff",
      }}
    >
      {/* LEFT SIDEBAR */}
      <div
        style={{
          width: "30%",
          background: "#1e293b",
          color: "white",
          padding: "20px",
        }}
      >
        {/* NAME */}
        <h2 style={{ marginBottom: "5px" }}>{profile?.fullname}</h2>
        <p style={{ fontSize: "13px" }}>{profile?.email}</p>
        <p style={{ fontSize: "13px" }}>{profile?.phone}</p>

        <hr style={{ margin: "15px 0", borderColor: "#334155" }} />

        {/* SKILLS */}
        <div style={{ marginBottom: "15px" }}>
          <h4 style={labelLight}>SKILLS</h4>
          <p style={{ fontSize: "13px" }}>{skills}</p>
        </div>

        {/* LINKS */}
        <div style={{ marginBottom: "15px" }}>
          <h4 style={labelLight}>LINKS</h4>
          {links?.linkedin && <p style={smallText}>LinkedIn</p>}
          {links?.github && <p style={smallText}>GitHub</p>}
          {links?.portfolio && <p style={smallText}>Portfolio</p>}
        </div>

        {/* CERTIFICATIONS */}
        {certifications?.length > 0 && (
          <div>
            <h4 style={labelLight}>CERTIFICATIONS</h4>
            {certifications.map((cert: any, i: number) => (
              <div key={i} style={{ marginBottom: "8px" }}>
                <p style={smallText}>
                  <b>{cert.title}</b>
                </p>
                <p style={smallText}>{cert.issuer}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* RIGHT CONTENT */}
      <div style={{ width: "70%", padding: "20px" }}>
        {/* PROFILE */}
        {profile?.summary && (
          <section style={section}>
            <h3 style={labelDark}>PROFILE</h3>
            <p>{profile.summary}</p>
          </section>
        )}

        {/* EXPERIENCE */}
        {experience?.length > 0 && (
          <section style={section}>
            <h3 style={labelDark}>EXPERIENCE</h3>
            {experience.map((exp: any, i: number) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <b>{exp.role}</b> - {exp.company}
                <div style={muted}>{exp.duration}</div>
                <p style={{ margin: "4px 0" }}>{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* PROJECTS */}
        {projects?.length > 0 && (
          <section style={section}>
            <h3 style={labelDark}>PROJECTS</h3>
            {projects.map((proj: any, i: number) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <b>{proj.title}</b>
                <p style={{ margin: "4px 0" }}>{proj.description}</p>
                <span style={muted}>{proj.techStack}</span>
              </div>
            ))}
          </section>
        )}

        {/* EDUCATION */}
        {education?.length > 0 && (
          <section style={section}>
            <h3 style={labelDark}>EDUCATION</h3>
            {education.map((edu: any, i: number) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <b>{edu.degree}</b> - {edu.institution}
                <div style={muted}>{edu.year}</div>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

/* ================= STYLES ================= */

const section = {
  marginBottom: "20px",
};

const labelDark = {
  fontSize: "14px",
  fontWeight: "700",
  borderBottom: "2px solid #1e293b",
  marginBottom: "8px",
};

const labelLight = {
  fontSize: "13px",
  fontWeight: "700",
  borderBottom: "1px solid #94a3b8",
  marginBottom: "6px",
};

const smallText = {
  fontSize: "12px",
  margin: "2px 0",
};

const muted = {
  fontSize: "12px",
  color: "#555",
};

export default ModernLayout;