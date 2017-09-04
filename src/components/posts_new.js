import React from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends React.Component {
    renderField(field) {
        return (
          <div className="form-group">
              <label>{field.label}</label>
              <input
                  className="form-control"
                  type="text"
                  {...field.input}
              />
              {field.meta.error}
          </div>
        );
    }

    onSubmit(values) {
        console.log(values);
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
})(PostsNew);