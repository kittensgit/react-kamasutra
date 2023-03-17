import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import loginFormSchema from "../../utils/validators/LoginFormSchema";
import s from './Login.module.css'

const Login = () => {
    return <div>
        <h1>Login</h1>
        <Formik
            initialValues={{
                email: "",
                password: "",
                rememberMe: false
            }}
            onSubmit={(values) => {
                console.log(values)
            }}
            validationSchema={loginFormSchema}
            >
            {({ handleSubmit, errors, touched }) => (
                <Form onSubmit={handleSubmit}>
                    <div>
                        <Field type={'text'} name={'email'} placeholder={'e-mail'} className={errors.email && touched.email ? `${s.field}` : ''}/>
                    </div>
                    <ErrorMessage name="email" component="div" className={s.error}/>

                    <div>
                        <Field type={'password'} name={'password'} placeholder={'password'} className={errors.password && touched.password ? `${s.field}` : ''}/>
                    </div>
                    <ErrorMessage name="password" component="div" className={s.error}/>

                    <div>
                        <Field type={'checkbox'} name={'rememberMe'} />
                        <label htmlFor={'rememberMe'}> remember me </label>
                    </div>

                    <button type={'submit'}>Log in</button>
                </Form>
            )}
        </Formik>
    </div>
}

export default Login
