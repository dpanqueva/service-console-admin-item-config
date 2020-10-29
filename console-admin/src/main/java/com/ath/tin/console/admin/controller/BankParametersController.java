package com.ath.tin.console.admin.controller;


import com.ath.tin.console.admin.commons.model.entity.BankParametersPK;
import com.ath.tin.console.admin.commons.model.entity.BankParameters;
import com.ath.tin.console.admin.model.service.IBankParametersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * @author Diego Panqueva
 * @version {2020-10-08} 1
 */
@RestController
public class BankParametersController {

    @Autowired
    private IBankParametersService bankParametersService;

    /**
     * Method for init page in method angular principal.
     *
     * @return all information about bank parameters
     */
    @GetMapping("/parameters")
    public List<BankParameters> index() {
        return bankParametersService.findAll();
    }

    /**
     * Method for find number page and obtain information about page
     *
     * @param page is a variable for to go to find the page and obtain all information about page
     * @return all information about bank parameters with the number page
     */
    @GetMapping("/parameters/page/{page}")
    public Page<BankParameters> index(@PathVariable Integer page) {
        return bankParametersService.findAll(PageRequest.of(page, 5));
    }

    /**
     * Method for find information from bank parameters
     *
     * @param handle    is a variable reference for the bank
     * @param paramName is a variable reference for the parameter name
     * @return all information if this has been find, the return is in responseEntity
     */
    @GetMapping("/parameters/{handle}/{paramName}")
    public ResponseEntity<?> show(@PathVariable String handle, @PathVariable String paramName) {
        BankParameters bankParameters = null;
        BankParametersPK id = new BankParametersPK();
        Map<String, Object> response = new HashMap<>();
        try {
            id.setHandle(handle);
            id.setParamName(paramName);
            bankParameters = bankParametersService.findById(id);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al realizar la consulta en la base de datos ");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception ex) {
            response.put("mensaje", "Error al realizar la consulta en la base de datos ");
            response.put("error", "Ocurrio un error inesperado: ".concat(ex.getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        if (bankParameters == null) {
            response.put("mensaje",
                    "El parametro con el ID: ".concat(id.getHandle().concat(" ").concat(id.getParamName())
                            .concat(" no existe en la basde de datos")));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }
        response.put("mensaje", "Parametro encontrado");
        response.put("parameter", bankParameters);
        return new ResponseEntity<BankParameters>(bankParameters, HttpStatus.OK);
    }

    /**
     * Method for create a new parameter
     *
     * @param bankParameters is a variable where you can obtain all information for create a new parameter
     * @return all information if this has been created, the return is in responseEntity
     */
    @PostMapping("/parameters")
    @ResponseStatus(HttpStatus.CREATED)
    public BankParameters create(@Valid @RequestBody BankParameters bankParameters, BindingResult result) {
        BankParameters bankParametersNuevo = null;
        Map<String, Object> response = new HashMap<>();
        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors().stream()
                    .map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
                    .collect(Collectors.toList());
            response.put("error", errors);
            //return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }
        try {
            bankParametersNuevo = bankParametersService.save(bankParameters);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al insertar en la base de datos");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            //return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "Se ha creado con éxito el nuevo parametro");
        response.put("bankparameters", bankParametersNuevo);
        return bankParametersNuevo;
        //return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }

    /**
     * Method for updated a parameter
     *
     * @param bankParameters is a variable where you can obtain all information for update a parameter
     * @param handle         is a variable reference for the bank
     * @param paramName      is a variable reference for the parameter name
     * @return all information if this has been update, the return is in responseEntity
     */
    @PutMapping("/parameters/{handle}/{paramName}")
    @ResponseStatus(HttpStatus.CREATED)
    public BankParameters update(@Valid @RequestBody BankParameters bankParameters, BindingResult result
            , @PathVariable String handle, @PathVariable String paramName) {
        Map<String, Object> response = new HashMap<>();
        BankParameters bankParametersExists = null;
        BankParameters bankParametersUpdated = null;
        try {
            BankParametersPK id = new BankParametersPK(handle, paramName);
            bankParametersExists = bankParametersService.findById(id);
            if (bankParametersExists == null) {
                response.put("mensaje", "Error: no se pudo editar, el parametro con el ID: "
                        .concat(id.getHandle().concat(" ").concat(id.getParamName())
                                .concat(" no existe en la basde de datos")));
               // return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
            }
            if (result.hasErrors()) {
                List<String> errors = result.getFieldErrors().stream()
                        .map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
                        .collect(Collectors.toList());
                response.put("error", errors);
                //return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
            }
            bankParametersExists.setBankParametersPK(id);
            bankParametersExists.setIsEncrypt(bankParameters.getIsEncrypt());
            bankParametersExists.setParamValue(bankParameters.getParamValue());
            bankParametersUpdated = bankParametersService.save(bankParametersExists);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al actualizar el parametro en la base de datos ");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            //return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "El parametro se ha actualizado con éxito");
        response.put("parameter", bankParametersUpdated);
        return bankParametersUpdated;
        //return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }

    /**
     * Method for delete a parameter
     *
     * @param handle    is a variable reference for the bank
     * @param paramName is a variable reference for the parameter name
     * @return all information if this has been deleted, the return is in responseEntity with a message
     */
    @DeleteMapping("/parameters/{handle}/{paramName}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String handle, @PathVariable String paramName) {
        Map<String, Object> response = new HashMap<>();
        try {
            BankParametersPK id = new BankParametersPK();
            id.setParamName(paramName);
            id.setHandle(handle);
            BankParameters bankParameters = bankParametersService.findById(id);
            if (bankParameters == null) {
                response.put("mensaje", "Error: no se pudo eliminar, el parametro con el ID: "
                        .concat(id.getHandle().concat(" ").concat(id.getParamName())
                                .concat(" no existe en la basde de datos")));
                //return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
            }
            bankParametersService.delete(bankParameters.getBankParametersPK());
        } catch (DataAccessException e) {
            response.put("mensaje", "Error al eliminar el parametro en la base de datos ");
            response.put("error", e.getMessage().concat(": ").concat(e.getMostSpecificCause().getMessage()));
            //return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "El parametro se ha eliminado con éxito");
        //return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NO_CONTENT);
    }
}