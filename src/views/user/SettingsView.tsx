import { useState } from "react";
import { AvatarSelector, Button } from "@/components";
import { AVATARS, type Message, MOVIE_GENRES, TV_GENRES } from "@/core";
import { useFirebaseContext } from "@/hooks";

export const SettingsView = () => {
  const { user, refreshUser, userName, setUserName, movieGenres, tvGenres, toggleMovieGenre, toggleTvGenre, saveGenres, changePassword } =
    useFirebaseContext();
  // const [value, setValue] = useState(userName);
  // const [error, setError] = useState("");
  const [movieError, setMovieError] = useState("");
  const [tvError, setTvError] = useState("");
  // const [success, setSuccess] = useState(false);

  const [displayName, setDisplayName] = useState(user?.displayName ?? userName);
  const [avatar, setAvatar] = useState(user?.photoURL ?? AVATARS[0]);
  const [message, setMessage] = useState<Message<"profile" | "genres" | "password"> | null>(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleProfile = async () => {
    const trimmed = displayName.trim();
    if (!trimmed) {
      setMessage({ category: "profile", message: "Username cannot be empty", type: "error" });
      return;
    }

    if (!user) {
      setUserName(trimmed);
      setMessage({ category: "profile", message: "Username updated", type: "success" });
    } else {
      try {
        await refreshUser({ displayName: trimmed, photoURL: avatar });
        setMessage({ category: "profile", message: "Profile updated successfully", type: "success" });
      } catch (e) {
        setMessage({ category: "profile", message: (e as Error).message, type: "error" });
      }
    }
  };

  const handleGenres = async () => {
    if (!user) {
      setMessage({ category: "genres", message: "No user found", type: "error" });
    } else {
      try {
        await saveGenres();
        setMessage({ category: "genres", message: "Genre preferences saved successfully", type: "success" });
      } catch (e) {
        setMessage({ category: "genres", message: (e as Error).message, type: "error" });
      }
    }
  };

  const handlePassword = async () => {
    if (!user) {
      setMessage({ category: "password", message: "No user found", type: "error" });
      return;
    } else if (!newPassword || !confirmPassword) {
      setMessage({ category: "password", message: "Both fields must be filled", type: "error" });
      return;
    } else if (newPassword !== confirmPassword) {
      setMessage({ category: "password", message: "Passwords do not match", type: "error" });
      return;
    } else {
      try {
        await changePassword(newPassword);
        setNewPassword("");
        setConfirmPassword("");
        setMessage({ category: "password", message: "Password updated successfully", type: "success" });
      } catch (e) {
        setMessage({ category: "password", message: (e as Error).message, type: "error" });
      }
    }
  };

  return (
    <section className="mx-auto max-w-7xl space-y-5 p-5">
      <h1 className="font-bold text-3xl">Settings</h1>
      <div className="flex items-start gap-6">
        <div className="flex w-1/3 flex-col gap-6">
          <div className="space-y-4 rounded-2xl border border-gray-700 bg-gray-900 p-6">
            <div>
              <h2 className="font-semibold text-lg">Profile</h2>
              <p className="text-gray-400 text-sm">Update your display profile</p>
            </div>
            {user && (
              <div className="space-y-2">
                <label className="text-gray-300 text-sm">Avatar</label>
                <AvatarSelector avatars={AVATARS} onChange={setAvatar} value={avatar} />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-gray-300 text-sm">Username</label>
              <input
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(event) => {
                  // setValue(event.target.value);
                  // setError("");
                  // setSuccess(false);
                  setDisplayName(event.target.value);
                  setMessage(null);
                }}
                placeholder="Enter your name"
                type="text"
                value={displayName}
              />
            </div>
            <div className="flex justify-end gap-2">
              {/* {error && <p className="mr-auto text-red-400 text-sm">{error}</p>}
            {success && <p className="mr-auto text-green-400 text-sm">Profile updated successfully</p>} */}
              {message?.category === "profile" && (
                <p className={`mr-auto text-sm ${message.type === "error" ? "text-red-400" : "text-green-400"}`}>{message.message}</p>
              )}
              <Button
                onClick={() =>
                  // setValue(userName)} variant="red"
                  setDisplayName(user?.displayName ?? userName)
                }
                variant="red"
              >
                Reset
              </Button>
              <Button
                onClick={() => {
                  // const trimmed = value.trim();

                  // if (!trimmed) {
                  //   setError("Username cannot be empty");
                  //   setSuccess(false);
                  //   return;
                  // } else {
                  //   setUserName(trimmed);
                  //   setError("");
                  //   setSuccess(true);
                  // }
                  handleProfile();
                }}
              >
                Save
              </Button>
            </div>
          </div>

          {!user?.providerData.some((v) => v.providerId === "google.com") && (
            <div className="space-y-4 rounded-2xl border border-gray-700 bg-gray-900 p-6">
              <h2 className="font-semibold text-lg">Security</h2>
              <input
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2"
                onChange={(e) => {
                  setNewPassword(e.currentTarget.value);
                  setMessage(null);
                }}
                placeholder="New password"
                type="password"
                value={newPassword}
              ></input>
              <input
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2"
                onChange={(e) => {
                  setConfirmPassword(e.currentTarget.value);
                  setMessage(null);
                }}
                placeholder="Confirm password"
                type="password"
                value={confirmPassword}
              ></input>
              {message?.category === "password" && (
                <p className={`text-sm ${message.type === "error" ? "text-red-400" : "text-green-400"}`}>{message.message}</p>
              )}
              <Button onClick={handlePassword}>Update Password</Button>
            </div>
          )}
        </div>

        <div className="ml-auto w-1/2 space-y-4 rounded-2xl border border-gray-700 bg-gray-900 p-6">
          <div>
            <h2 className="font-semibold text-lg">Preferences</h2>
            <p className="text-gray-400 text-sm">Choose genres you like</p>
          </div>
          <h3 className="font-semibold">Movies</h3>
          <div className="grid grid-cols-3 gap-2">
            {MOVIE_GENRES.map((genre) => (
              <label className="flex cursor-pointer items-center gap-2 text-sm" key={genre.id}>
                <input
                  checked={movieGenres.includes(genre.name)}
                  className="accent-blue-500"
                  onChange={() => {
                    if (movieGenres.includes(genre.name) && movieGenres.length === 1) {
                      setMovieError("You must select at least one movie genre");
                    } else {
                      setMovieError("");
                      toggleMovieGenre(genre.name);
                    }
                  }}
                  type="checkbox"
                />
                {genre.name}
              </label>
            ))}
          </div>
          <h3 className="font-semibold">TV</h3>
          <div className="grid grid-cols-3 gap-2">
            {TV_GENRES.map((genre) => (
              <label className="flex cursor-pointer items-center gap-2 text-sm" key={genre.id}>
                <input
                  checked={tvGenres.includes(genre.name)}
                  className="accent-blue-500"
                  onChange={() => {
                    if (tvGenres.includes(genre.name) && tvGenres.length === 1) {
                      setTvError("You must select at least one tv genre");
                    } else {
                      setTvError("");
                      toggleTvGenre(genre.name);
                    }
                  }}
                  type="checkbox"
                />
                {genre.name}
              </label>
            ))}
          </div>
          {movieError && <p className="text-red-400 text-sm">{movieError}</p>}
          {tvError && <p className="text-red-400 text-sm">{tvError}</p>}
          {message?.category === "genres" && (
            <p className={`mr-auto text-sm ${message.type === "error" ? "text-red-400" : "text-green-400"}`}>{message.message}</p>
          )}
          <Button onClick={handleGenres}>Save</Button>
        </div>
      </div>
    </section>
  );
};
