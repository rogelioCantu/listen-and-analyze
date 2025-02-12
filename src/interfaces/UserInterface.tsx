interface User {
  accessToken: string;
  profile: {
    id: string;
    displayName: string;
    profileUrl: string;
    [key: string]: any; // You can add more properties as needed
  };
}

export default User;
