(function(){
    var st={
        parent   : '.post',
        coment   : '.comentarios',
        form     : 'form.nuevo_comentario',
        elInput  : 'input[name="comentario"]',


        username : 'Alvaro Acuña',
        foto     : 'foto-2.jpeg',
        arrayComent : []
    };

    var dom={};
    //son ejecutables
    var catchDom =function(){
        dom.parent = $(st.parent);
        dom.coment = $(st.coment,dom.parent);

        dom.form = $(st.form,dom.parent);
        dom.elInput = $(st.elInput,dom.form);
    }
    //SON EJECUTABLES
    var suscribeEvents = function(){
        dom.form.on('submit',events.stopSubmit)
    }

    // objeto que almacena funciones
    var events = {
        stopSubmit : function(e){
            e.preventDefault();

            var  objcoment = {
                date : new Date(),
                coment : dom.elInput.val()
            }

            st.arrayComent.push(objcoment);

            dom.coment.empty();
            $.each(st.arrayComent, function(index,obj){
                var time = fn.getTimeElapsed(obj.date, objcoment.date),
                    newhtml = fn.getNewComent(obj.coment,time);

                dom.coment.append(newhtml);
            })
            dom.elInput.val('');
        }
    }

    var fn = {
        getNewComent : function(coment,time) {
            return  '<li>'+
                        '<figure class="foto">'+
                            '<a href="../img/'+ st.foto+'" target="_blank" class="icono">'+
                                '<img src="../img/'+ st.foto+'" alt="Foto">'+
                            '</a>'+
                        '</figure>'+
                        '<div class="informacion">'+
                            '<h2>'+
                                '<a href="../img/'+ st.foto+'" target="_blank">'+ st.username +'</a>'+
                                // '<span>+1</span>'+
                            '</h2>'+
                            '<p>' + coment + '</p>'+
                        '</div>'+
                        '<div class="tiempo">' +
                            '<span>'+ time +'sec.</span>'+
                        '</div>'+
                    '</li>';
        },

        getTimeElapsed(date, currentDate){
            var mintDate = date.getMinutes(),
                secondsDate = date.getSeconds(),
                totalDate = mintDate*60 + secondsDate;

            var mintCurrent = currentDate.getMinutes(),
                secondsCurrent = currentDate.getSeconds(),
                totalCurrent = mintCurrent*60 + secondsCurrent;

            return totalCurrent - totalDate;
        }
    }

    function initialize(){
        catchDom();
        suscribeEvents();
    }

    initialize();

})();
