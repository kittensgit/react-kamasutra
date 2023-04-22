import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect } from "react-redux";
//@ts-ignore
import loginFormSchema from "../../utils/validators/LoginFormSchema.ts";
//@ts-ignore
import s from './Login.module.css';
//@ts-ignore
import { login, logout } from "../../redux/auth-reducer.ts";
import { Navigate } from "react-router-dom";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
    captchaUrl: string | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string | null, setStatus: any)=>void
}

const Login:React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

    if (props.isAuth) {
        return <Navigate to='/profile/*' />
    }

    return <div>
        <h1>Login</h1>
        <Formik
            initialValues={{
                email: "",
                password: "",
                rememberMe: false,
                captcha: ''
            }}
            onSubmit={(values, { setSubmitting, setStatus }): any => {
                props.login(values.email, values.password, values.rememberMe, values.captcha, setStatus);
                setSubmitting(false)
            }}
            validationSchema={loginFormSchema}
        >
            {({ handleSubmit, errors, touched, status }) => (
                <Form onSubmit={handleSubmit}>
                    <div>
                        <Field type={'text'} name={'email'} placeholder={'e-mail'}
                            className={errors.email && touched.email ? `${s.field}` : ''} />
                    </div>
                    <ErrorMessage name="email" component="div" className={s.error} />

                    <div>
                        <Field type={'password'} name={'password'} placeholder={'password'}
                            className={errors.password && touched.password ? `${s.field}` : ''} />
                    </div>
                    <ErrorMessage name="password" component="div" className={s.error} />

                    <div>
                        <Field type={'checkbox'} name={'rememberMe'} />
                        <label htmlFor={'rememberMe'}> remember me </label>
                    </div>


                    <div className={s.status}>
                        {status}
                    </div>

                    {props.captchaUrl && <img src={props.captchaUrl} alt='captcha'/>}
                    {props.captchaUrl &&  <Field type={'text'} name={'captcha'} placeholder={'symbols from image'} />}

                    <button type={'submit'}>Log in</button>
                </Form>
            )}
        </Formik>
    </div>
}

const mapStateToProps = (state: AppStateType):MapStatePropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login, logout })(Login);
