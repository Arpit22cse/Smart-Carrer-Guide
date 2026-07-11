import React from "react";

const ProfessionalLayout = ({ data }: any) => {
  const { profile, links, skills, experience, projects, education, certifications } = data;

  return (
    <div
      style={{
        width: "800px",
        margin: "auto",
        padding: "30px",
        fontFamily: "Times New Roman, serif",
        background: "#fff",
        color: "#000",
        lineHeight: 1.6,
      }}
    >
      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <h1 style={{ margin: 0 }}>{profile?.fullname}</h1>
        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          {profile?.email} | {profile?.phone}
        </p>

        <p style={{ fontSize: "13px" }}>
          {links?.linkedin && "LinkedIn | "}
          {links?.github && "GitHub | "}
          {links?.portfolio && "Portfolio"}
        </p>
      </div>

      <hr />

      {/* PROFILE */}
      {profile?.summary && (
        <section style={section}>
          <h3 style={label}>PROFILE</h3>
          <p>{profile.summary}</p>
        </section>
      )}

      {/* SKILLS */}
      {skills && (
        <section style={section}>
          <h3 style={label}>SKILLS</h3>
          <p>{skills}</p>
        </section>
      )}

      {/* EXPERIENCE */}
      {experience?.length > 0 && (
        <section style={section}>
          <h3 style={label}>EXPERIENCE</h3>
          {experience.map((exp: any, i: number) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <b>{exp.role}</b> - {exp.company} ({exp.duration})
              <p style={{ margin: "4px 0" }}>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* PROJECTS */}
      {projects?.length > 0 && (
        <section style={section}>
          <h3 style={label}>PROJECTS</h3>
          {projects.map((proj: any, i: number) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <b>{proj.title}</b>
              <p style={{ margin: "4px 0" }}>{proj.description}</p>
              <span style={smallText}>{proj.techStack}</span>
            </div>
          ))}
        </section>
      )}

      {/* EDUCATION */}
      {education?.length > 0 && (
        <section style={section}>
          <h3 style={label}>EDUCATION</h3>
          {education.map((edu: any, i: number) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <b>{edu.degree}</b> - {edu.institution} ({edu.year})
            </div>
          ))}
        </section>
      )}

      {/* CERTIFICATIONS */}
      {certifications?.length > 0 && (
        <section style={section}>
          <h3 style={label}>CERTIFICATIONS</h3>
          {certifications.map((cert: any, i: number) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <b>{cert.title}</b> - {cert.issuer} ({cert.date})
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

/* ================= STYLES ================= */

const section = {
  marginTop: "15px",
};

const label = {
  fontSize: "16px",
  fontWeight: "bold",
  textTransform: "uppercase" as const,
  borderBottom: "1px solid #000",
  marginBottom: "6px",
};

const smallText = {
  fontSize: "12px",
  color: "#333",
};

export default ProfessionalLayout;