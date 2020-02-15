import React, { Component } from 'react';
import './FormMovie.css';

class FormMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            poster: '',
            comment: ''
        } 

        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    } 

    onChange(event) {
        this.setState({
           [event.target.name]: event.target.value
        });
    } 

    submitForm(event) {
        event.preventDefault();

        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state)
        }

        const url = "https://post-a-form.herokuapp.com/api/movies/";

        fetch(url, config)
        .then(resp => resp.json())
            .then(resp => {
                if (resp.error) {
                    alert(resp.error);
                } else {
                    alert(`Added movie with the title ${ this.state.title } and ID ${ resp.id }!`);

                    this.setState ({
                        title: '',
                        poster: '',
                        comment: ''
                    });
                } 
            }).catch(e => {
                console.error(e);
                alert('Error adding the movie!');
            });
    } 

    render() {
        return(
            <div className="FormMovie">
                <h2>Favorite Movie</h2>
                <form onSubmit={ this.submitForm }>
                    <fieldset>
                        <div className="form-data">
                            <label htmlFor="title">Movie Title:</label>
                            <input type="text" id="title" name="title" onChange={ this.onChange } value={ this.state.title } />
                        </div>

                        <div className="form-data">
                            <label htmlFor="poster">Movie URL Poster:</label>
                            <input type="text" id="poster" name="poster" onChange={ this.onChange } value={ this.state.poster } />
                        </div>

                        <div className="form-data">
                            <label htmlFor="comment">Movie Comment:</label>
                            <textarea type="text" id="comment" name="comment" onChange={ this.onChange } value={ this.state.comment }></textarea>
                        </div>

                        <hr />

                        <div className="form-data">
                            <button type="submit" id="submit">Submit</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        );
    } 
} 

export default FormMovie;