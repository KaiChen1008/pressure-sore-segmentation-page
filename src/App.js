import React, {Fragment}               from 'react'
import thunkMiddleware      from 'redux-thunk';
import loggerMiddleware     from 'redux-logger';
import {Provider, connect}  from 'react-redux';
import Container from '@material-ui/core/Container';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import Typography from '@material-ui/core/Typography';
import MainScreen   from './MainScreen'
import {main}       from './states/MainReducer'
import Divider from '@material-ui/core/Divider';
import './App.css';



const store = createStore(combineReducers({
    main,
}), compose(applyMiddleware(thunkMiddleware)))

export default class App extends React.Component {
    constructor(props) {
        super(props);
    } 

    render() { 
		return (
            <Container fixed className="App">
                <Typography className='Title'>Online Pressure Sore Diagnosis</Typography>
                
                <Provider store={store} >
                    <MainScreen/>
                </Provider>
            </Container>
		)};

}