import type { ProfileProps } from "../../types";

export function ProfileOptions({ profile }: ProfileProps) {
    const { id, username } = profile

  return (
    <option value={id}>
     {username}
    </option>
  )
}
