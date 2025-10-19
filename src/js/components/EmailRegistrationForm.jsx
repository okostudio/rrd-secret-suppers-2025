import React from "react";
import { Formik, Field, useField } from "formik";
import { TextField } from "@material-ui/core";
import * as yup from "yup";

const validationSchema = yup.object({
    email: yup
        .string()
        .required()
        .email()

    // consentToReply: yup.boolean().isValid(true)
});

function SubscribeForm(props) {
    return (
        <div className={"enquiryForm"}>
            <Formik
                initialValues={{
                    email: ""
                }}
                validationSchema={validationSchema}
                onSubmit={(data, { setSubmitting }) => {
                    setSubmitting(true);

                    // make asynch calls here
                    console.log(data);

                    setSubmitting(false);
                }}
            >
                {({
                    values,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <FormikTextField
                                placeholder="example@gmail.com"
                                name="email"
                                type="input"
                            />
                        </div>

                        <div className="button-primary">
                            <button type="submit">
                                Subscribe for SS2020 <span />
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default SubscribeForm;

const FormikTextField = ({ label, type, placeholder, adornment, ...props }) => {
    // console.log("Text With Field: ", props);

    const [field, meta] = useField(props);
    //
    // Adds input props element to force label into reduced position.
    //
    const errorText = meta.error;
    return (
        <Field
            className={"input-wrapper " + props.className}
            type={type}
            label={label}
            placeholder={placeholder}
            {...field}
            as={TextField}
            error={errorText === false}
            required={true}
        />
    );
};
