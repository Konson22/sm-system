export const isAuth = () => {
    const localSavedProfile = JSON.parse(localStorage.getItem("PROFILE"));
    return localSavedProfile
  };