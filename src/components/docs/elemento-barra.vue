<template lang="pug">
div.elemento-barra
    router-link.link-barra(:to="rutaActual" :class="clases" :style="paddingIzq")
        | {{ tema.titulo }}
    div.inner(v-if="tema.temas")
        elemento-barra(v-for="(subtema, i) in tema.temas"
            :key="i"
            :tema="subtema"
            :ruta="ruta + tema.ruta + '/'"
            :padreActivo="esRutaActiva"
            :nivel="nivel + 1"
            :fragmentosUrl="fragmentosUrl")

//
</template>

<script lang="coffee">
import {computed} from "vue"

export default
    name: "elemento-barra"
    props:
        tema:
            type: Object
            required: true
        ruta:
            type: String
            required: true
        padreActivo:
            type: Boolean
            required: true
        nivel:
            type: Number
            required: true
        fragmentosUrl:
            type: Array
            required: true
    setup: (props) =>
        rutaActual = computed (=> props.ruta + props.tema.ruta + "/")
        esRutaActiva = computed (=>
            if props.padreActivo
                rutaActual = props.fragmentosUrl[props.nivel] ? ""
                (rutaActual isnt "") and (props.tema.ruta is rutaActual)
            else false
        )
        clases = computed (=>
            if esRutaActiva.value then ["elemento-activo-barra-docs"] else []
        )
        paddingIzq = computed (=>
            {paddingLeft: (0.5 + (props.nivel * 0.75)) + "rem"}
        )

        {
            rutaActual
            esRutaActiva
            clases
            paddingIzq
        }


#
</script>

<style scoped lang="sass">

.inner
    // padding-left: 1rem


.link-barra
    display: inline-block
    width: 100%
    padding: 0.5rem 0.15rem 0.5rem 0
    color: var(--color)
    text-decoration: none
    box-sizing: border-box

    &:hover
        background-color: var(--color-t-transparente)

.elemento
    padding: 0.5rem 0.25rem 0.5rem 0.5rem

    a
        text-decoration: none
        color: var(--color)



.elemento-activo-barra-docs
    color: var(--colorSecundario) !important
    font-weight: 600

</style>
