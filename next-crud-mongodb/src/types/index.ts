export type UserPost = {
    title: string,
    description: string,
    name: string,
    lastname: string,
    date: string,
    readingTime: string,
    image: string
}

export type GetPostsVariables = {
    items: UserPost[],
    pages: number,
    newPage: string
}

export type ArrowButtonProps = {
    direction?: 'forward' | 'backward';
    changePage: () => void
  };