# Página web de la Batucada Bloco Virado

## ¡Visítanos! [blocovirado.org](https://blocovirado.org)

![Logo Bloco Virado](RecursosLogos/LogoCiguena.png)

Esta web usa un renderizador de plantillas [Mustache](http://mustache.github.io/) 
para facilitar la inserción de algunos contenidos como el histórico de actuaciones.

Para utilizarlo, en lugar de editar directamente el archivo [index.html](public/index.html),
modificar la plantilla [index.mustache.html](index.mustache.html) 
y después ejecutar `python build.py` (es necesario haber instalado `chevron` en un entorno virtual)
a través del fichero [requirements.txt](requirements.txt)

---

## Próximos eventos

Se ha desarrollado un script que se conecta con el API de la web [Alcalá es Música](https://alcalaesmusica.org) 
para mostrar los próximos eventos de una banda. 

![Próximos eventos demo web](doc/proximos-eventos-demo.jpg =400x)

Está encapsulado a través de un Web-component reutilizable, por si cualquier banda registrada en la web de
Alcalá es Música quiere utilizarlo. Para ello, sólo hay que incluir este fichero: 
[band-events-component.js](public/assets/js/band-events-component.js) en la web de la banda, e
insertar estas líneas de código en el lugar del código html donde se quieren ver los eventos:

```html
<band-events band-id="{id}"></band-events>
<script src="assets/js/band-events-component.js"></script>
```
Sustituyendo {id} por el identificador númerico de la banda en la web de Alcalá es Música (se puede encontrar fácilmente
usando [el buscador de bandas](https://alcalaesmusica.org/bands/) y fijándose en el número al final de la dirección web,
por ejemplo para [Bloco Virado](https://alcalaesmusica.org/bands/265/), el identificador es el **265**)

---

Diseño de la plantilla: Big Picture  ([HTML5 UP](https://html5up.net/))
html5up.net | @ajlkn 
Free for personal and commercial use under the [CCA 3.0 license](https://html5up.net/license)


Créditos:

	Icons:
		Font Awesome (fontawesome.io)

	Other:
        Chevron (https://pypi.org/project/chevron)
		jQuery (jquery.com)
		Poptrox (github.com/ajlkn/jquery.poptrox)
		Scrollex (github.com/ajlkn/jquery.scrollex)
		Responsive Tools (github.com/ajlkn/responsive-tools)