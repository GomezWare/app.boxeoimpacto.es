const declaredRoutes = [
    {path: '/login', rol:'' , isPublic: true},
    {path: '/app/**', rol:['admin', 'user'], isPublic: false},
    {path: '/admin/**', rol:['admin'], isPublic: false},
]

export default declaredRoutes;