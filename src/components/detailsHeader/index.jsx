export default function DetailsHeader({ cidade, latitude, longitude }) {
    return (
        <header>
            <h1 >{cidade}</h1>
            <p>Lat: {latitude} Long: {longitude}</p>
        </header>
    )
}