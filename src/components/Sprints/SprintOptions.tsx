import type { SprintProps } from "../../types";

export function SprintOptions({ sprint }: SprintProps) {
    const { id, name } = sprint

  return (
    <option value={id}>
     {name}
    </option>
  )
}
