import React from 'react'

import './sign-up-form.styles.scss'

const SignUpForm = () => {
    const handleSubmit = event => {
        const name = event.target.name.value
        const lastname = event.target.lastname.value
        const role = event.target.role.value
        if (!name || !lastname || !role) {
            alert('You must fill in all the fields')
            return
        }
        alert('Submission successful.')
        // store the data in db
    }

    return (
        <section className="form-container">
            <h1>Sign up </h1>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <label>
                        <p>Name</p>
                        <input name="name" />
                    </label>
                    <label>
                        <p>Last name</p>
                        <input name="lastname" />
                    </label>
                    <label>
                        <p>Role</p>
                        <input name="role" />
                    </label>
                </fieldset>
                <button type="submit">Submit</button>
            </form>
        </section>
    )
}

export default SignUpForm
