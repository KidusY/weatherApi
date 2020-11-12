import React, { useState } from 'react';
import './landingPage.css';
import Slider from 'react-slick';
export const LandingPage = (props) => {
	function validateZipCode(elementValue) {
		var zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
		return zipCodePattern.test(elementValue);
	}

	const [ error, showError ] = useState(false);

	const newsCards = props.currentNews.map((news,i) => (
	<a href={news.url} rel="noreferrer" target="_blank" key={i}>	<div className="newsCard">
			<img src={news.urlToImage} alt="newsImg" />
			<h2>{news.title} </h2>
			<h3>{news.description}</h3>
			<h4>{news.source.name} </h4>
			<p>{news.content} </p>
		</div>
		</a>
	));
	const settings = {
		dots: true,
		infinite: true,
		speed: 700,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
	};

	return (
		<div className="weatherInfo">
			<div className="weatherInfoContainer">
				<div className="currentLocation">
					<h1>{props.currentWeatherInfo.name} </h1>
					<h2> {props.currentDate} </h2>
				</div>

				<div className="currentWeatherInfo">
					{!!props.currentWeatherInfo.main ? (
						<div>
							<h1>{Math.ceil(props.currentWeatherInfo.main.temp)}&deg;</h1>
							<center>
								{' '}
								<h2>{props.currentWeatherInfo.weather[0].description.toUpperCase()} </h2>{' '}
							</center>
							<h2>
								Humidity: {props.currentWeatherInfo.main.humidity} | WindSpeed:{' '}
								{props.currentWeatherInfo.wind.speed}{' '}
							</h2>
							<h3>
								Min: {props.currentWeatherInfo.main.temp_min} | Max:{' '}
								{props.currentWeatherInfo.main.temp_max}
							</h3>
						</div>
					) : (
						<div />
					)}
				</div>
			</div>
			<div className="infoContainer">
				<form onSubmit={props.getWeatherReport}>
					<label htmlFor="zipcode">Zip Code</label>
					{error ? <label> Please Enter a ZipCode </label> : <div />}
					<input
						name="zipcode"
						placeholder="91910"
						autoComplete="off"
						required
						onBlur={(e) => {
							if (!validateZipCode(e.target.value)) showError(true);
							else showError(false);
						}}
					/>

					<button>Search</button>
				</form>

				<div className="news">
				<h1> Current News</h1>
					<Slider {...settings}>{newsCards}</Slider>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;
