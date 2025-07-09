let currentUser = null;

export const setCurrentUser = (userData) => {
    currentUser = userData;
};

export const getCurrentUser = () => {
    return currentUser;
};