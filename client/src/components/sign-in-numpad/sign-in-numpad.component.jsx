import React from 'react'

import './sign-in-numpad.styles.scss'


const SignInNumpad = () => {
    const addNumber = num => {
        const useridInput = document.getElementById('userid')
        useridInput.value = useridInput.value + num
    }

    const removeNumber = () => {
        const useridInput = document.getElementById('userid')
        useridInput.value = useridInput.value.slice(0, useridInput.value.length - 1)
    }

    const removeAllNumbers = () => {
        const useridInput = document.getElementById('userid')
        useridInput.value = ''
    }

    return (
        <div className='numpad'>
            <div className='button-group'>
                <button type='button' className='number' onClick={() => addNumber(7)}>7</button>
                <button type='button' className='number' onClick={() => addNumber(8)}>8</button>
                <button type='button' className='number' onClick={() => addNumber(9)}>9</button>
            </div>

            <div className='button-group'>
                <button type='button' className='number' onClick={() => addNumber(4)}>4</button>
                <button type='button' className='number' onClick={() => addNumber(5)}>5</button>
                <button type='button' className='number' onClick={() => addNumber(6)}>6</button>
            </div>

            <div className='button-group'>
                <button type='button' className='number' onClick={() => addNumber(1)}>1</button>
                <button type='button' className='number' onClick={() => addNumber(2)}>2</button>
                <button type='button' className='number' onClick={() => addNumber(3)}>3</button>
            </div>

            <div className='button-group'>
                <button type='button' className='number' onClick={() => addNumber(0)}>0</button>
                <button type='button' className='number' title='delete character' onClick={removeNumber}>&larr;</button>
                <button type='button' className='number' title='delete all' onClick={removeAllNumbers}>X</button>
            </div>
        </div>
    )
}

export default SignInNumpad;
