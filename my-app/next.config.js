const API_KEY = "7230c02a8ca1a3e0a9a3ec92ee1b9ec8"
module.exports = {
  reactStrictMode: true,
  async redirects(){
    return [
      {
        source:"/contact",
        destination:"https://nomadcoders.co",
        permanent: false,
      },
    ];
  },
  async rewrites(){
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
      {
        source: "/api/movies/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`
      }
    ];
  },
}
