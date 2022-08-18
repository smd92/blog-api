import React from 'react'

const Landingpage = () => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
      fetch("/api")
        .then((res) => res.json())
        .then((data) => setData(data.message));
    }, []);
  return (
    <div>
        <p>Landingpage</p>
        <p>{!data ? "Loading..." : data}</p>
    </div>
  )
}

export default Landingpage