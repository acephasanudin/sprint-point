import type { FolderProps } from "../../types";

export function FolderOptions({ folder }: FolderProps) {
    const { id, name } = folder

  return (
    <option value={id}>
     {name}
    </option>
  )
}
