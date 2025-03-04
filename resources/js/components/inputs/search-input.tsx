import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchInput({buttonProps , ...props}: React.ComponentProps<typeof Input> & {buttonProps:React.ComponentProps<typeof Button>}) {
  return (

       <div className="flex w-full max-w-sm items-center space-x-2">
      <Input {...props}/>
      <Button className="cursor-pointer" {...buttonProps}></Button>
    </div>

  )
}
