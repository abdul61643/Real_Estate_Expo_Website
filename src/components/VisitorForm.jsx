{/* VISITOR FORM */ }
{
  step === "visitor" && (
    <div className="reg-form-wrap">
      <button className="reg-back-btn" onClick={() => setStep("choose")}>
        ← Back
      </button>

      <div className="modal-title">Visitor Registration</div>
      <div className="modal-subtitle">
        Fill in your details to attend the expo.
      </div>

      <div className="reg-grid" style={{ marginTop: "1.5rem" }}>

        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input
            className="form-input"
            name="name"
            placeholder="Enter your full name"
            value={form.name}
            onChange={handle}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email *</label>
          <input
            className="form-input"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handle}
          />
        </div>

        <div className="form-group reg-full">
          <label className="form-label">Phone Number</label>
          <input
            className="form-input"
            name="phone"
            placeholder="Enter your phone number"
            value={form.phone}
            onChange={handle}
          />
        </div>

      </div>

      <div className="reg-actions">
        <button className="btn-primary" onClick={submit}>
          Confirm Registration →
        </button>

        <button className="btn-outline" onClick={() => setStep("choose")}>
          Cancel
        </button>
      </div>
    </div>
  )
}