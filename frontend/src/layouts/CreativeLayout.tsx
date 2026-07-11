const CreativeLayout = ({ data }: any) => {
  const { profile, links, skills, experience, projects, certifications, education } = data;

  return (
    <div
      style={{
        width: "800px",
        margin: "auto",
        fontFamily: "Poppins, sans-serif",
        background: "#fff",
        padding: "20px",
        color: "#111",
      }}
    >
      {/* HEADER */}
      <div style={{ marginBottom: "20px" }}>
        <h1 style={{ margin: 0 }}>{profile?.fullname}</h1>
        <p style={{ margin: "5px 0", fontSize: "14px" }}>
          {profile?.email} | {profile?.phone}
        </p>

        <p style={{ fontSize: "13px", color: "#555" }}>
          {links?.linkedin && "LinkedIn | "}
          {links?.github && "GitHub | "}
          {links?.portfolio && "Portfolio"}
        </p>
      </div>

      {/* PROFILE */}
      {profile?.summary && (
        <section style={section}>
          <h2 style={label}>PROFILE</h2>
          <p>{profile.summary}</p>
        </section>
      )}

      {/* SKILLS */}
      {skills && (
        <section style={section}>
          <h2 style={label}>SKILLS</h2>
          <p>{skills}</p>
        </section>
      )}

      {/* EXPERIENCE */}
      {experience?.length > 0 && (
        <section style={section}>
          <h2 style={label}>EXPERIENCE</h2>
          {experience.map((exp: any, i: number) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <b>{exp.role}</b> — {exp.company}
              <div style={{ fontSize: "12px", color: "#555" }}>
                {exp.duration}
              </div>
              <p style={{ margin: "4px 0" }}>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* PROJECTS */}
      {projects?.length > 0 && (
        <section style={section}>
          <h2 style={label}>PROJECTS</h2>
          {projects.map((proj: any, i: number) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <b>{proj.title}</b>
              <p style={{ margin: "4px 0" }}>{proj.description}</p>
              <span style={{ fontSize: "12px", color: "#555" }}>
                {proj.techStack}
              </span>
            </div>
          ))}
        </section>
      )}

      {/* EDUCATION */}
      {education?.length > 0 && (
        <section style={section}>
          <h2 style={label}>EDUCATION</h2>
          {education.map((edu: any, i: number) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <b>{edu.degree}</b> — {edu.institution}
              <div style={{ fontSize: "12px", color: "#555" }}>
                {edu.year}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* CERTIFICATIONS */}
      {certifications?.length > 0 && (
        <section style={section}>
          <h2 style={label}>CERTIFICATIONS</h2>
          {certifications.map((cert: any, i: number) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <b>{cert.title}</b> — {cert.issuer}
              <div style={{ fontSize: "12px", color: "#555" }}>
                {cert.date}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

/* ================= STYLES ================= */

const section = {
  marginBottom: "18px",
};

const label = {
  fontSize: "14px",
  fontWeight: "700",
  letterSpacing: "1px",
  borderBottom: "1px solid #000",
  marginBottom: "8px",
};

export default CreativeLayout;