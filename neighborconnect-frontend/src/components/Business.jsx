const logos = import.meta.glob(
    "../assets/images/logos/*.png",
    { eager: true, query: "?url", import: "default" }
);


export default function Business({ business }) {


    if (!business) {
        return <p>Business Doesnt Exist</p>;
    }
    const logoPath = logos[`../assets/images/logos/${business.id}.png`];

    return (
        <div>
            <h2><img
                src={logoPath}
                alt={`${business.name} (${business.id}) logo`}
                className="img-fluid"
                style={{ maxHeight: "200px", objectFit: "contain" }}
            /></h2>
            <p>{business.description}</p>

            <p>{business.address}</p>
            <p>{business.city}</p>
            <p>{business.state}</p>

            <p>{business.zipCode}</p>
            <p>
                <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visit {business.name}'s Website
                </a>
            </p>
            <p>Phone: {business.phone}</p>
            <p>Email: {business.email}</p>
            <p>Owner: {business.owner.name}</p>
        </div>
    );
}