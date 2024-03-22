import PaleteColorComponent from './PaleteColor.component'

export default function ChangeColorComponent() {
    return (
        <section className="grid grid-cols-2 p-5">
            <PaleteColorComponent type_color='light' />
            <PaleteColorComponent type_color='dark' />
        </section>
    )
} 