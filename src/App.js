import './App.css';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LandingPage from './routes/landingPage/landingPage';
import axios from 'axios';
export default class App extends Component {
	constructor() {
		super();

		this.state = {
			currentWeatherInfo: {},
			currentLocation: {},
			currentDate: new Date().toDateString(),
			currentNews: []
		};
	}

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			(data) => {
				if (data.coords) {
					axios
						.get(
							`https://api.opencagedata.com/geocode/v1/json?q=${data.coords.latitude}+${data.coords
								.longitude}&key=e33a71e933ed4e4c8525916d7fe761e8`
						)
						.then((res) => {
							this.setState({
								currentLocation: res.data.results[0].components,
								currentDate: new Date(data.timestamp).toDateString()
							});

							return res.data.results[0].components;
						})
						.then((currentLocation) =>
							axios
								.get(
									`https://api.openweathermap.org/data/2.5/weather?zip=${currentLocation.postcode}&appid=08f510999bd48b7c32f3ab13bb0ddecf&units=imperial`
								)
								.then((res) => this.setState({ currentWeatherInfo: res.data }))
								.catch((err) => console.log(err))
						);
				}
			},
			() => this.setState({ currentLocation: null })
		);
		axios
			.get(
				`https://newsapi.org/v2/everything?q=weather&from=${this.state
					.currentDate}&sortBy=publishedAt&apiKey=6ca59adb3a7a451c80f23e2752202893`)
			.then((res) =>{
				console.log(res)
				 this.setState({ currentNews: res.data.articles })
				})
			.catch((err) => console.log(err));
	}
	getWeatherReport = (e) => {
		e.preventDefault();
		const { zipcode } = e.target;
		const data = {
			zip: `${zipcode.value},US`,
			appid: '08f510999bd48b7c32f3ab13bb0ddecf'
		};

		axios
			.get(`https://api.openweathermap.org/data/2.5/weather?zip=${data.zip}&appid=${data.appid}&units=imperial`)
			.then((res) => this.setState({ currentWeatherInfo: res.data }))
			.catch((err) => console.log(err));
	};
	render() {
		return (
			<div className="app">
				<Route
					exact
					path="/"
					component={() => (
						<LandingPage
							getWeatherReport={this.getWeatherReport}
							currentLocation={this.state.currentLocation}
							currentDate={this.state.currentDate}
							currentWeatherInfo={this.state.currentWeatherInfo}
							currentNews={this.state.currentNews}
						/>
					)}
				/>
			</div>
		);
	}
}
