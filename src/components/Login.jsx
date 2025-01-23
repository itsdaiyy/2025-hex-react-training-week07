function Login({ handleSubmit, formData, handleInputChange }) {
  return (
    <div className="container h-100 d-flex align-items-center justify-content-center">
      <div className="row border justify-content-center row-gap-5 py-5">
        <h2 className="text-center">請先登入</h2>
        <div className="col-8">
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Submit
            </button>
          </form>
        </div>
        <small className="text-secondary text-center mb-5">
          © 2024~∞ - 六角學院
        </small>
      </div>
    </div>
  );
}

export default Login;
