// modules
import React, { useState } from 'react';
import Axios from 'axios';

// css
import "./MovieForm.css";

export default function MovieForm(){

    // je crée un state général pour tous les inputs sous formes d'objet
    // (en rapport avec les données renvoyées par l'API)
    const [ inputs, setInputs ] = useState({
        title:'',
        poster:'',
        comment:''
    });

    // je modifie les données en rentrant dans l"objet (spread operateur)
    // puis en targetant la valeur chaque input avec la saisie de l'utilisateur
    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value // "[name]" permet de signifier à React que l'on souhaite modifier plusieurs inputs
        });
    };

    const submitForm = (e) => {
        e.preventDefault();
        const url = 'https://post-a-form.herokuapp.com/api/movies/';
        // on utilise axios pour submit le form
        Axios.post(url, inputs) // on donne une url et la data à envoyer
        .then(response => response.data)
        .then(response => alert(`Le film "${response.title}" a bien été ajouté avec l'ID ${response.id} !`))
        .catch(error => {
            console.log(error);
            alert(`Erreur lors de l'ajout du film : ${error.message}`);
        });
        // on clear les inputs après l'envoi du form
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
                            required
                        />
                    </div>
                    <div className="ContainerInput">
                        <input
                            name="poster"
                            value={inputs.poster}
                            onChange={handleChange}
                            type="text"
                            placeholder="Url de l'image"
                            required
                        />
                    </div>
                    <div className="ContainerTextarea">
                        <textarea
                            name="comment"
                            value={inputs.comment}
                            onChange={handleChange}
                            type="text"
                            placeholder="Votre message..."
                            required
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