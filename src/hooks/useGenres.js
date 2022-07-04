const useGenres = (selectedGenres) => {
if(selectedGenres.length < 1) return " "

const genresID = selectedGenres.map(g => g.id)

return genresID.reduce((accum, current) => accum + ',' + current)
}

export default useGenres