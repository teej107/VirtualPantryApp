export const home = (history) => {
    return history ? history.push('/') : '/';
};

export const recipes = (history, id) => {
    return history ? history.push(`/recipes/${id}`) : '/recipes/:id';
};