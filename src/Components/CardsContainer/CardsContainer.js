/* eslint-disable eqeqeq */
import React, { useContext } from 'react'
import { Context } from '../../Context/AppContext'
import Card from '../AuthorCard/Card'
const CardsContainer = () => {
    const { authors } = useContext(Context)

    return (
        <>
            {authors && authors.map(author => (
                <Card props={author} key={author.id} />
            ))}
        </>
    )
}


export default CardsContainer