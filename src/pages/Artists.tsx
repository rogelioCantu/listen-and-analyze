import User from "../interfaces/UserInterface";

const Artists = ({ user }: { user: User }) => {
  return <div>{user.profile.id}</div>;
};

export default Artists;
