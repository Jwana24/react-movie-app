// modules
import React, { useState } from 'react';
import Axios from 'axios';

// css
import "./MovieForm.css";

export default function MovieForm(){

    const [ inputs, setInputs ] = useState({
        title:'',
        poster:'',
        comment:''
    });

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };

    const submitForm = (e) => {
        e.preventDefault();
        const url = 'https://post-a-form.herokuapp.com/api/movies/';
        // on utilise axios pour submit le form
        Axios.post(url, inputs)
        .then(response => response.data)
        .then(response => alert(`Film ajouté avec l'ID ${response.id} !`))
        .catch(error => {
            console.log(error);
            alert(`Erreur lors de l'ajout du film : ${error.message}`);
        });
        setInputs({
            title:'',
            poster:'',
            comment:''
        });
    };

    return(
        <div className="Movieform">
            <h1>Formulaire de films</h1>
            <form className="ContainerForm" onSubmit={submitForm}>
                <fieldset>
                    <legend>Informations</legend>
                    <div className="ContainerInput">
                        <input
                            name="title"
                            value={inputs.title}
                            onChange={handleChange}
                            type="text"
                            placeholder="Titre du film"
                        />
                    </div>
                    <div className="ContainerInput">
                        <input
                            name="poster"
                            value={inputs.poster}
                            onChange={handleChange}
                            type="text"
                            placeholder="Url de l'image"
                        />
                    </div>
                    <div className="ContainerTextarea">
                        <textarea
                            name="comment"
                            value={inputs.comment}
                            onChange={handleChange}
                            type="text"
                            placeholder="Message"
                        />
                    </div>
                </fieldset>
                <div className="ContainerSubmitButton">
                    <input
                        name="submit"
                        value="Envoyer"
                        type="submit"
                    />
                </div>
            </form>
        </div>
    );
}