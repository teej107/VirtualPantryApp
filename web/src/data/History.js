export const home = Object.freeze({
    regex: /\//,
    pathname: '/',
    title: () => 'Virtual Pantry',
    push: (history) => history.push(this.pathname)
});

export const recipes = Object.freeze({
    regex: /\/recipes\/\d+/,
    pathname: '/recipes/:id',
    title: (recipe) => recipe.title,
    push: (history, id) => history.push(`/recipes/${id}`)
});

export const newRecipe = Object.freeze({
    regex: /\/recipes\/new/,
    pathname: '/recipes/new',
    title: () => "New Recipe",
    push: (history) => history.push(this.pathname)
});