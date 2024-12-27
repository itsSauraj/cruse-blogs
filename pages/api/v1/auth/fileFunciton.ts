import path from "path";
import fs from "fs";

export async function WriteUserToFile(data: UserTypes.DBUser): Promise<void>{
  const file = fs.readFileSync("data/users.json", "utf-8");
  const users = JSON.parse(file);

  users.push(data);

  fs.writeFileSync("data/users.json", JSON.stringify(users));
}

export async function ReadUsersFromFile(): Promise<UserTypes.DBUser[]> {
  const directoryPath = path.join(process.cwd(), "data", "users.json");
  const file = fs.readFileSync(directoryPath, "utf-8").toString();

  return JSON.parse(file);
}
