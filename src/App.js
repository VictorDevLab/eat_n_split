import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList friends={friends}/>
        {showAddFriend && <AddFriendForm onAddFriend={handleAddFriend} />}
        {/* you don't have to use the same name you used in useState() above */}
        <Button onClick={() => setShowAddFriend((open) => !open)}>
          {showAddFriend ? "close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendList({friends}) {
  const friendsList = friends;

  return (
    <ul>
      {friendsList.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3 className="h3">{friend.name}</h3>

      {/* mutually exclusive, meaning only one of them will apply */}
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are equal</p>}

      <Button>Select</Button>
    </li>
  );
}

function AddFriendForm({onAddFriend}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const id = Date.now();

  function handleSubmit(e) {
    if (!name || !image) return;
    e.preventDefault();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>Friend's name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>

      <label>Image Url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>
      <label>Bill Value</label>
      <input type="text"></input>

      <label>Your expense</label>
      <input type="text"></input>

      <label>X's expense</label>
      <input type="text" disabled></input>

      <label>Who is paying the bill</label>
      <select>
        <option value="you">You</option>
        <option value="friend">Friend</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
