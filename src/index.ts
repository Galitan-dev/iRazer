function reverse(message: string): string {
    return message.split('').reverse().join('');
}

console.log(reverse("Hello TypeScript!"))