import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPost} from "../actions";

class PostsNew extends React.Component {
    renderField(field) {


        const redOutline = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;

        return (
          <div className={redOutline}>
              <label>{field.label}</label>
              <input
                  className="form-control"
                  type="text"
                  {...field.input}
              />
              <div className="text-help">
                {field.meta.touched ? field.meta.error : ''}
              </div>
          </div>
        );
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }


    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Post Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}


function validate(values) {
    const errors = {};

    /*
    if (values.title.length < 3) {
        errors.title = "Title must be at least three characters long!";
    }
    */

    if (!values.title) {
        errors.title = "Please enter a title!";
    }

    if (!values.categories) {
        errors.categories = "Please enter some categories";
    }

    if (!values.content) {
        errors.content = "Please enter some content";
    }

    return errors;
}



export default reduxForm({
    validate: validate,
    form: 'PostsNewForm'
})(
    connect(null, {createPost })(PostsNew)
);