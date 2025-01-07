import { createSlice } from '@reduxjs/toolkit';




// Création du slice utilisateur
const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: "",
    firstName: "",
    lastName: "",
    userName: ""
  },
  reducers: {
    setUser: (state, action) => {
      return action.payload; // Stocke les informations de l'utilisateur

    },
    setUserEmail: (state, action) => {
        state.email= action.payload
    },
    setFirstName: (state, action) => {
        state.firstName= action.payload
    },
    setLastName: (state, action) => {
        state.lastName= action.payload
    },
    setUserName: (state, action) => {
        state.userName= action.payload
    },
    clearUser: (state) => {
      state.email = ""
      state.firstName = ""
      state.lastName = ""
      state.userName = ""
    },
  },
});

// Export des actions générées
export const { setUser, setFirstName, setLastName, setUserEmail, setUserName, clearUser } = userSlice.actions;

// Export du reducer pour le store
export default userSlice.reducer;
/*{
    "email": "string",
    "password": "string",
    "firstName": "string",
    "lastName": "string",
    "userName": "string"
  }*/