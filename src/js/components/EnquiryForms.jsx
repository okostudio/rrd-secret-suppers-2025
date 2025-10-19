import React, { useState } from "react";
import { Formik, Field, useField } from "formik";
import {
    TextField,
    InputAdornment,
    TextareaAutosize,
    Checkbox,
    FormGroup,
    FormControlLabel
} from "@material-ui/core";
import { ButtonSubmit } from "./ButtonPrimary";
import * as yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = yup.object({
    firstName: yup
        .string()
        .required()
        .max(32),
    lastName: yup
        .string()
        .required()
        .max(32),
    email: yup
        .string()
        .required()
        .email(),
    phone: yup
        .string()
        .required()
        .matches(phoneRegExp, "Phone number is not valid"),
    message: yup
        .string()
        .required()
        .max(1024)
    // consentToReply: yup.boolean().isValid(true)
});

function EnquiryForm(props) {
    const [enquiryType, setEnquiryType] = useState(null);
    const [showDropdown, toggleShowDropdown] = useState(false);

    return (
        <div className={"enquiryForm" + props.classes}>
            <div className="enquity-type-selection">
                <h3>HAVE AN ENQUIRY?</h3>
                <p className="hide-mobile">
                    What would you like to enquire about?
                </p>
                <div>
                    <div className="button-dropdown">
                        <button
                            onClick={() => {
                                toggleShowDropdown(!showDropdown);
                            }}
                        >
                            Select enquiry option <span />
                        </button>
                        <ul className={showDropdown ? "" : "collapsed"}>
                            <li
                                onClick={() => {
                                    setEnquiryType("general");
                                    toggleShowDropdown(false);
                                }}
                            >
                                General enquiry
                            </li>
                            <li
                                onClick={() => {
                                    setEnquiryType("product");
                                    toggleShowDropdown(false);
                                }}
                            >
                                Product enquiry
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <React.Fragment>
                {enquiryType ? (
                    <Formik
                        initialValues={{
                            firstName: "",
                            lastName: "",
                            phone: "",
                            email: "",
                            message: "",
                            productname: "",
                            bestbydate: "",
                            barcode: "",
                            storename: "",
                            storelocation: "",
                            promoOptIn: false,
                            consentToReply: false
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(data, { setSubmitting }) => {
                            setSubmitting(true);

                            // make asynch calls here
                            console.log("make asynch calls here...", data);

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
                                    <TextFieldWithLabel
                                        label="First name"
                                        placeholder="E.g. John"
                                        name="firstName"
                                        type="input"
                                    />
                                    <TextFieldWithLabel
                                        label="Last name"
                                        placeholder="E.g. Smith"
                                        name="lastName"
                                        type="input"
                                    />
                                </div>
                                <div className="form-group">
                                    <TextFieldWithLabel
                                        label="Contact Number"
                                        placeholder="+61"
                                        name="phone"
                                        type="tel"
                                    />
                                    <TextFieldWithLabel
                                        label="Contact Email"
                                        placeholder="example@gmail.com"
                                        name="email"
                                        type="input"
                                    />
                                </div>

                                {enquiryType === "product" ? (
                                    <div className="product-enquiry">
                                        <div className="form-group">
                                            <TextFieldWithLabel
                                                label="Product Name &amp; Flavour"
                                                placeholder="e.g. Deluxe Chips, Parmesan Truffle"
                                                name="productname"
                                                type="inuput"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <TextFieldWithLabel
                                                className="date"
                                                label="Best before date"
                                                placeholder="01/01/2010"
                                                name="bestbydate"
                                                type="date"
                                            />
                                            <TextFieldWithLabel
                                                label="Barcode"
                                                placeholder="Code#"
                                                name="barcode"
                                                type="input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <TextFieldWithLabel
                                                label="Store purchased"
                                                placeholder="e.g. Woolworths"
                                                name="storename"
                                                type="input"
                                            />
                                            <TextFieldWithLabel
                                                label="Store location"
                                                placeholder="e.g. Millers Point"
                                                name="storelocation"
                                                type="input"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}

                                <div className="textarea-wrapper">
                                    <label
                                        className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink Mui-required Mui-required"
                                        data-shrink="true"
                                    >
                                        Reason for enquiry
                                        <span className="MuiFormLabel-asterisk MuiInputLabel-asterisk">
                                             *
                                        </span>
                                    </label>
                                    <TextareaAutosize
                                        name="message"
                                        rowsMin={3}
                                        required={true}
                                        value={values.message}
                                        placeholder="Type your message here"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </div>
                                <FormGroup className="checkbox-wrapper">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                name="promoOptIn"
                                                checked={values.promoOptIn}
                                                value={values.promoOptIn}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        }
                                        label="I’d like to receive further information regarding our products and promotions."
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                required={true}
                                                name="consentToReply"
                                                checked={values.consentToReply}
                                                value={values.consentToReply}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                        }
                                        label="Please tick this box if you give us your consent to respond to your query or comment. Any personal information you provide to us will be held in accordance with our privacy policy."
                                    />
                                </FormGroup>

                                <ButtonSubmit
                                    disabled={isSubmitting || errors}
                                    type="submit"
                                >
                                    Submit enquiry
                                </ButtonSubmit>

                                {/* 
                            // ERROR MESSAGES
                            <pre>{JSON.stringify(values, null, 2)}</pre>
                            <pre>{JSON.stringify(errors, null, 2)}</pre> 
                            */}
                            </form>
                        )}
                    </Formik>
                ) : (
                    ""
                )}
            </React.Fragment>
        </div>
    );
}

export default EnquiryForm;

const TextFieldWithLabel = ({
    label,
    type,
    placeholder,
    adornment,
    ...props
}) => {
    // console.log("Text With Field: ", props);

    const [field, meta] = useField(props);
    //
    // Adds input props element to force label into reduced position.
    //
    const _adornment = adornment ? adornment : "";
    const errorText = meta.error && meta.touched ? meta.error : false;
    return (
        <Field
            className={"input-wrapper " + props.className}
            type={type}
            label={label}
            placeholder={placeholder}
            {...field}
            as={TextField}
            error={errorText}
            required={true}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        {_adornment}
                    </InputAdornment>
                )
            }}
        />
    );
};
