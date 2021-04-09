import React, { Component } from "react";
import Joi from "joi-browser";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Input from "./input";
import Select from "./select";

import {
  Button,
  StyledDate,
  StyledDOB,
} from "../../styles/styledFormComponents";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  handleDateChange = (date, name) => {
    const target = {
      currentTarget: {
        name,
        value: date,
      },
    };
    this.handleChange(target);
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    // console.log(error);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton(label) {
    return <Button disabled={this.validate()}>{label}</Button>;
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderDatePicker(name, label) {
    const { data, errors } = this.state;

    return (
      <StyledDate>
        <div className="wrapp">
          <label htmlFor={name}>{label}</label>
          <DatePicker
          selected={data[name]}
            onChange={(date) => this.handleDateChange(date, name)}
            dateFormat="MM/dd/yyyy"
            showYearDropdown
            scrollableMonthYearDropdown
          />
        </div>
        {errors[name] && (
          <div className="alert alert-danger">{errors[name]}</div>
        )}
      </StyledDate>
    );
  }

  renderDOB(name, label) {
    const { data, errors } = this.state;

    return (
      <StyledDOB>
        <label htmlFor={name}>{label}</label>
        <DatePicker
          selected={data[name]}
          onChange={(date) => this.handleDateChange(date, name)}
          dateFormat="MM/dd/yyyy"
          showYearDropdown
          scrollableMonthYearDropdown
        />
        {errors[name] && (
          <div className="alert alert-danger">{errors[name]}</div>
        )}
      </StyledDOB>
    );
  }

  renderFileInput(name, label, type = "text") {
    return (
      <div className="custom-file " style={{zIndex:0}}>
        <input
          type={type}
          className="custom-file-input"
          id="customFile"
          onChange={this.uploadFileHandler}
        />
        <label className="custom-file-label" htmlFor="customFile">
          {this.state.filename}
        </label>
      </div>
    );
  }
 
}

export default Form;
