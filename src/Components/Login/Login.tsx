import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { connect, useDispatch, useSelector } from "react-redux";
//@ts-ignore
import loginFormSchema from "../../utils/validators/LoginFormSchema.ts";
//@ts-ignore
import s from './Login.module.css';
//@ts-ignore
import { login } from "../../redux/auth-reducer.ts";
import { Navigate } from "react-router-dom";
import { AppStateType } from "../../redux/redux-store";
import { AnyAction } from "redux";

export const LoginPage: React.FC = () => {

    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    if (isAuth) {
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
                dispatch(login(values.email, values.password, values.rememberMe, values.captcha, setStatus) as unknown as AnyAction);
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

                    {captchaUrl && <img src={captchaUrl} alt='captcha' />}
                    {captchaUrl && <Field type={'text'} name={'captcha'} placeholder={'symbols from image'} />}

                    <button type={'submit'}>Log in</button>
                </Form>
            )}
        </Formik>
    </div>
}
