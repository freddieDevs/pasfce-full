interface HeadingProps {
  title: string;
  description: string
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  description
}) => {
  return(
    <div className="text-cyan-700">
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-lg text-cyan-700 text-muted-foreground">{description}</p>
    </div>
  )
}